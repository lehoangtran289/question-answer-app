// khi ma HTML load xong
$(document).ready(()=>{
    const pathName = window.location.pathname; //lay thong tin tu url, cu the dung de lay questionId 
    const questionId = pathName.split('/')[pathName.split('/').length - 1]; //split tra ve array -> lay phan tu cuoi cung

    // ajax tuong tu viec type vao URL va ENTER
    // thay vì .send `HTML` thì có thể .json và sử dụng ajax
    // gui ve request ajax -> ko lam page reload -> kiem soat toan bo ket qua tra ve
    // nhan vao object, define info cua route ma no se gui request den
    // data is taken from /get-question-by-id? -> data la selectQuestion trong server.js

    $.ajax({
        url: `/get-question-by-id?questionId=${questionId}`,
        type: 'GET',
        success: (data) => {
            if (data.id != null) {
                document.getElementById('question-content').innerText = data.content;
                document.getElementById('total-vote').innerText = `Total: ${data.yes + data.no} votes`;

                if (data.yes == 0 && data.no == 0) {
                    document.getElementById('yes-percent').innerText = `Yes: 0%`;
                    document.getElementById('no-percent').innerText = `No: 0%`;
                }
                else {
                    const yesPercent = data.yes * 100 / (data.yes + data.no);
                    const noPercent = 100 - yesPercent;
                    document.getElementById('yes-percent').innerText = `Yes: ${yesPercent.toFixed(2)}%`;
                    document.getElementById('no-percent').innerText = `No: ${noPercent.toFixed(2)}%`;
                }
            }
            else {
                document.getElementById('question-content').innerText = `Question not found`;
            }
        },
        error: (error) => {
            console.log(error);
        },
    }); 
})