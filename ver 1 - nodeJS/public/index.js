$(document).ready(()=>{
    $.ajax({
        url: '/random-question',
        type: 'GET',
        success: (data) => {
            if (data.id !== null) {
                document.getElementById('question-content').innerText = data.content;

                // listen yes click -> chuyen ve /vote/id/yes
                document.getElementById('vote-yes').addEventListener('click', () => {
                    $.ajax({
                        url: `/vote/${data.id}/yes`,
                        type: 'GET',
                        success: (_result) => {
                            // if vote success -> redirect to result
                            window.location.href=`/result/${data.id}`;
                        },
                        error: (error) => {
                            console.log(error);
                        },
                    });
                });

                // listen no click
                document.getElementById('vote-no').addEventListener('click', () => {
                    $.ajax({
                        url: `/vote/${data.id}/no`,
                        type: 'GET',
                        success: (_result) => {
                            // if vote success -> redirect to result
                            window.location.href=`/result/${data.id}`;
                        },
                        error: (error) => {
                            console.log(error);
                        },
                    });
                });

                // listen result
                document.getElementById('question-result').addEventListener('click', ()=>{
                    window.location.href = `/result/${data.id}`;
                });

                // listen other question
                document.getElementById('other-question').addEventListener('click', ()=>{
                    window.location.reload();
                });

                // listen create question
                document.getElementById('create-question').addEventListener('click', ()=>{
                    window.location.href = `/create-question`;
                });

            } else {
                document.getElementById('question-content').innerText = 'NotFound';
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
});