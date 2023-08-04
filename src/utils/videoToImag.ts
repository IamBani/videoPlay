function calculateSize(video: HTMLVideoElement, videoWidth: number, videoHeight: number) {
  let width = video.videoWidth
  let height = video.videoWidth
  if (video.videoWidth > video.videoHeight) {
    if (video.videoWidth > videoWidth) {
      const scale = videoWidth / video.videoWidth
      width = videoWidth
      height = video.videoHeight * scale
    }
  } else if (video.videoHeight > videoHeight) {
    const scale = videoHeight / video.videoHeight
    height = videoHeight
    width = video.videoWidth * scale
  }
  return {
    width,
    height,
  }
}

function drawVideo(video: HTMLVideoElement) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const maxWidth = 254
  const maxHeight = (maxWidth * 9) / 16
  const { width, height } = calculateSize(video, maxWidth, maxHeight)
  canvas.width = width
  canvas.height = height
  ctx?.drawImage(video, 0, 0, width, height)
  const dataUrl = ctx?.canvas.toDataURL('image/jpeg', 0.9) || ''
  return dataUrl
}

export default function captureFrame(file: string) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.currentTime = 1
    video.src = `file:///${file}`
    video.autoplay = true
    video.oncanplay = () => {
      const { duration } = video
      const min = Math.floor(duration / 60)
      const sec = Math.floor(duration % 60)
      const dataUrl = drawVideo(video)
      resolve({
        duration: `${min >= 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`,
        poster: dataUrl,
      })
    }
    video.onerror = (): void => {
      resolve(null)
    }
  })
}
