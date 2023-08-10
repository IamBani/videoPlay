/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { path } from '@ffmpeg-installer/ffmpeg'

import ffmpeg from 'fluent-ffmpeg'

export default class Ffmepg {
  private instance: ffmpeg.FfmpegCommand | null = null

  constructor() {
    this.init()
  }

  init() {
    console.log(123, path)
    ffmpeg.setFfmpegPath(path)
  }

  create(input: string) {
    this.instance = ffmpeg()
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
        console.log(`An error occurred: ${err.message}`)
      })
      .on('end', () => {
        console.log('Processing finished!')
      })
    return this.instance
  }

  kill(): void {
    if (this.instance) {
      this.instance.kill('')
    }
  }
}
