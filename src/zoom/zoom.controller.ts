import {Body, Controller, Get, Post, Res, UseGuards} from '@nestjs/common';
import {ZoomService} from "./zoom.service";
import {Response} from 'express';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {dirPath} from "./dto/downloadFile";
import {createFile} from "../../api google drive/createFilee.js"
import {createFolder} from "../../api google drive/createFilee.js"
import { createReadStream, promises as fsPromises } from 'fs';
import * as path from "path";


@Controller('zoom')
export class ZoomController {
    constructor(private readonly zoomService: ZoomService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getLog(@Res() res: Response ){
        const fileName = 'zoom-log.txt'
        const filePath = path.join(__dirname, '..', '..', fileName);
        try {
            // Проверка существования файла
            await fsPromises.access(filePath);
      
            // Создание потока чтения файла
            const fileStream = createReadStream(filePath);
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-Type', 'text/plain');
      
            // Асинхронное отправление файла
            fileStream.pipe(res);
          } catch (error) {
            res.status(404).send('File not found');
          }
    }

    @Post('validate')
    async checkValidate(@Body() body: any, @Res() res: Response) {
        // Проверяем, соответствует ли событие вебхуку для проверки URL
        if (body.event === 'endpoint.url_validation') {
            // Валидация вебхука Zoom и сохранение лога
            const response = await this.zoomService.validateZoomWebhook(body.payload.plainToken)
            await this.zoomService.saveLog(body)
            return await res.status(200).json(response)

        }
        // Сохранение лога для всех событий
        await this.zoomService.saveLog(body)
        // Проверка, является ли событие завершением записи и соответствует ли оно условиям
        if (body.event === "recording.completed" && dirPath.hasOwnProperty(body.payload.object.host_id)) {
            const cache = await this.zoomService.checkInCache(body.event_ts)
            // Проверка на дублирование событий в кэше
            if (cache) {
                return res.status(200).send('dublicate')
            }
            // Формирование имени файла из времени начала и темы собрания
            let filename = `${body.payload.object.start_time} ` + `${body.payload.object.topic}`
            const account_id = body.payload.object.host_id
            filename = filename.replace(/:/g, '-').replace(/[\/\\]/g, ' ');

            //
            const filePath = path.join(process.cwd(), '/static') + `/${filename}.mp4`;

            const meetingId = body.payload.object.id
            if (body.payload.object.total_size < 10485760){
                await this.zoomService.deleteRecord(meetingId, filePath)
                return res.status(200).json({data: 'Webhook received'})

            } 
            let currentIndex = 0;
            const list = body.payload.object.recording_files
            const lastIndex = list.length - 1;

            // Итерация по всем файлам записи
            for (let file of list) {

                if (file.download_url) {
                    const url = file.download_url
                    // console.log(dirPath[account_id][1])

                   
                    // Пропускаем файлы, которые не являются видео
                    if (file.file_type !== "MP4") {
                        console.log(file.file_type)

                        if (currentIndex === lastIndex) {
                            await this.zoomService.deleteRecord(meetingId, filePath)

                            return res.status(200).json({data: 'Webhook received'})

                        }
                        currentIndex++;

                        continue
                    }
                    // Загрузка видео и проверка его размера
                    const local_file = await this.zoomService.downloadVideo(url, filePath)
                    if (local_file === 'small') {
                        if (currentIndex === lastIndex) {
                            await this.zoomService.deleteRecord(meetingId, filePath)
                            return res.status(200).json({data: 'Webhook received'})

                        }
                        currentIndex++;
                        continue


                    }

                    // Сохранение файла в Google Drive, если он больше минимального размера
                    if (local_file) {
                        const folder_id = await createFolder(filename, dirPath[account_id][1])
                        const drive_file = await createFile(filePath, filename + '.mp4', folder_id)
                        if (drive_file) {
                            if (currentIndex === lastIndex) {
                                await this.zoomService.deleteRecord(meetingId, filePath)

                                return res.status(200).json({data: 'Webhook received'})

                            }
                            currentIndex++;


                        } else return res.status(404)
                    } else return res.status(404)


                } else return res.status(404)
            }

        // Возврат ошибки, если account_id не определен или другое событие
        } else return await res.status(404).json({err: 'account_id undefined'})

    }
}
