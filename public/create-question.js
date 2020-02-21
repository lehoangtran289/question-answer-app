// doccument.getElementById, getElementByClassName, querySelector(All)
// tuong tac voi element HTML = JS

// 3 steps: tim element -> tim event trong element: .addEventListener -> lam gi khi su kien xay ra 

window.onload = () => {
    // find element -> bat su kien trong textarea
    const textArea = document.getElementById('content');

    // .addEventListener() -> lay ra data va dem string length // Event: "input"
    textArea.addEventListener("input", (event) => {
        const textLength = textArea.value.length; //.value to get string from <textarea> element
        const remaining = 200 - textLength;
    
        //find element dem string
        const remainChar = document.getElementById('remainChar'); // tra ve HTML element

        if (remaining <= 0) {
            remainChar.innerHTML = '200 Characters reached.';
            textArea.value = textArea.value.substring(0, 200); //stop user from typing when 200 char reached
        }
        else {
            //change text_count
            remainChar.innerText = `${remaining}/200 characters left`;
        }
    });

    // listen submit
    // cancel viec tu submit cua form (default), huy default cua event, phụ thuộc element (ví dụ: a là click, form là submit)
    document.getElementById('create-form').addEventListener('submit', (event) => {
        event.preventDefault(); 

        //get question content
        const form = document.getElementById('create-form');
        const questionContent = form.content.value; // content = id name attribute cua <tag> trong form 

        //form validation
        if (!questionContent) {
            document.getElementById('error-message').innerText = 'Please input question';
        } else {
            $.ajax({
                url: '/create-question',
                type: 'POST',
                // data = object gui len theo dang req.body
                // co 3 cach gui du lieu len server (dataAjax(thong qua req.body), paramURL(:name), queryURL(?...))
                data: {
                    content: questionContent,
                }, 
                // sau khi tạo xong câu hỏi thì chuyển qua trang kết quả -> cần id của câu hỏi vừa tạo (obj đc chuuyen xuống)
                success: (data) => {
                    console.log('here', data.id);
                    // dưới browser cần data gì -> update ngược trên server cái response -> tra ve data minh` can
                    if (data.id !== null) {
                        window.location.href = `result/${data.id}`;
                    } else {
                        window.alert('Failed to create question');
                    }
                },
                error: (error) => {},
            });
        }

    });

};

