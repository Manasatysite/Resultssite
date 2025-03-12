function searchImage() {
    const studentId = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // مسح النتائج السابقة

    if (!studentId) {
        resultDiv.innerHTML = '<p>يرجى إدخال الرقم السري للطالب.</p>';
        return;
    }

    // تكوين الرابط الديناميكي باستخدام Dropbox
    const baseUrl = "https://www.dropbox.com/scl/fo/p62iwv93uqcvuko3wlzwv/AI_iV0WNqWentXCYIdmSB4g/";
    const rlkey = "?rlkey=rgotkvfsg1jqdt6tq665l8djy&st=uu8703s8&dl=1";
    const imageUrl = `${baseUrl}${studentId}.jpg${rlkey}`;

    fetch(imageUrl)
        .then(response => {
            if (response.ok) {
                return response.blob(); // الحصول على الصورة كـ Blob
            } else {
                throw new Error('لم يتم العثور على نتيجة لهذا الرقم.');
            }
        })
        .then(blob => {
            const imageObjectUrl = URL.createObjectURL(blob); // إنشاء رابط مؤقت للصورة
            resultDiv.innerHTML = `
                <img src="${imageObjectUrl}" alt="نتيجة الطالب">
                <a href="${imageObjectUrl}" download="${studentId}.jpg">تحميل الصورة</a>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>${error.message}</p>`;
        });
}