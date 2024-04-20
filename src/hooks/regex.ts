export const returnFormattedDate = (date: string) => {
    let newdate = new Date(date);
    let day = String(newdate.getUTCDate()).padStart(2, '0');
    let month = String(newdate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
    let year = newdate.getUTCFullYear();
    let hours = String(newdate.getUTCHours()).padStart(2, '0');
    let minutes = String(newdate.getUTCMinutes()).padStart(2, '0');
    let formattedDate = `${day}-${month}-${year}`;
    return formattedDate
}