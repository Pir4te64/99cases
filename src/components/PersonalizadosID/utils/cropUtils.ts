export async function getCroppedImg(imageSrc: string, pixelCrop: { width: number; height: number; x: number; y: number; }, rotation = 0) {
    const image = await new Promise<HTMLImageElement>((res, rej) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => res(img);
        img.onerror = rej;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Aplica rotación
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise<string>((resolve) => {
        canvas.toBlob(blob => {
            resolve(URL.createObjectURL(blob!));
        }, 'image/jpeg');
    });
}
