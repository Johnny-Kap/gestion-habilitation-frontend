export const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAFKCAMAAADcyF29AAABxVBMVEVHcEwJCAggFxEBAQE2KyQAAAA0LScAAAAAAAA1LysXEQ0EBAQFBAMDAwMLCQgGBQUFBAOEQhUHBwZjQSuScFoVFRZvNAx5NghcOyaudU8yMDBrNhOiViMZFhXEdD3Ef0+4ZzFISUdSJwliMA6BPA6lVR8CAgEDAgQPDhANDgsKCQoVFhPObi4SERS2VxcE.......";
let logo = workbook.addImage({
    base64: logoFile.logoBase64,
    extension: 'png',
});

worksheet.addImage(logo, 'E1:F3');