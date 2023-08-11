/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { path } from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'

import stream from 'stream'

type Istream = stream.Writable | stream.PassThrough | undefined
export interface IFfmepg {
  init: () => void
  create: (key: string) => Istream
  kill: () => void
}

export default class Ffmepg implements IFfmepg {
  instance: ffmpeg.FfmpegCommand | undefined

  pipe: Istream

  constructor() {
    this.init()
  }

  init() {
    this.instance = ffmpeg.setFfmpegPath(path)
  }

  create(input: string) {
    console.log(input)
    this.pipe = ffmpeg()
      .input(input)
      .nativeFramerate()
      .videoCodec('libx264')
      .audioCodec('copy')
      .format('mp4')
      .outputOptions('-movflags', 'frag_keyframe+empty_moov+faststart')
      .on('progress', (progress) => {
        console.log(`Timemark: ${progress.timemark}`)
      })
      .on('error', (err) => {
        console.log(`错误: ${err.message}`)
      })
      .on('end', () => {
        console.log('Processing finished!')
      })
      .duration(150)
      .pipe()
    return this.pipe
  }

  kill(): void {
    if (this.instance) {
      this.instance.kill('')
    }
  }
}
