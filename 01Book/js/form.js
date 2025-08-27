//전역변수
const API_BASE_URL = "http://localhost:8080";

//DOM 엘리먼트 가져오기
const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");

//Document Load 이벤트 처리하기
document.addEventListener("DOMContentLoaded", function () {
    LoadBooks();
});
//bookForm의 Submit이벤트 처리
bookForm.addEventListener("submit", function (event) {
    //기본으로 설정된 Event가 동작하지 않도록 하기 위함
    event.preventDefault();
    console.log("Form 이 체출 되었음....");

    //FormData 객체생성 <form>엘리먼트를 객체로 변환
    const bookFormData = new FormData(bookForm);
    bookFormData.forEach((value, key) => {
        console.log(key + '=' + value);
    });

    //사용자 정의 Book Object
    const bookData = {
        title: bookFormData.get("title").trim(),
        author: bookFormData.get("author").trim(),
        isbn: bookFormData.get("isbn").trim(),
        price: bookFormData.get("price").trim(),
        publisheDate: bookFormData.get("pulishDate"),
    }
})

//도서 목록을 Load 하는 함수
function LoadBooks() {
    console.log("도서 목록 Load 중.....");
    fetch(`${API_BASE_URL}/api/books`)
        .then((response) => {
            return response.json();
        })
        .then((books) => renderBookTable(books))
        .catch((error) => {
            console.log(error);
            alert("도서 목록을 불러오는데 실패했습니다!.");
        });
}
function renderBookTable(books) {
    console.log(books);
    // books가 배열인지 확인하는 안전장치 추가
    if (!Array.isArray(books)) {
        console.error("전달된 값이 유효한 배열이 아닙니다:", books);
        return; 
    }
    bookTableBody.innerHTML = "";
    books.forEach((book) => {
        const row = document.createElement("tr");
        //<tr>의 content을 동적으로 생성
        row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>${book.price}</td>
                    <td>${book.publishDate}</td>
                    <td>
                        <button class="edit-btn" onclick="editBook(${book.id})">수정</button>
                        <button class="delete-btn" onclick="deleteBook(${book.id},'${book.title}')">삭제</button>
                    </td>
                `;
        //<tbody>의 아래에 <tr>을 추가시켜 준다.
        bookTableBody.appendChild(row);
    });
}//renderBookTable

//도서 유효성 검사
function validateBook(book) {
    if (!book.title) {
        alert("제목을 입력해주세요.");
        return false;
    }
    if (!book.author) {
        alert("저자를 입력해주세요.");
        return false;
    }
    if (!book.isbn) {
        alert("ISBN을 입력해주세요.");
        return false;
    }
    if (!book.price) {
        alert("가격을 입력해주세요.");
        return false;
    }
    if (!Number.isInteger(price) && price > 0) {
        alert("가격은 정수여야합니다")
        return false;
    }
    if (!book.isbn) {
        alert("ISBN을 입력해주세요.");
        return false;
    }
    if (!book.publisheDate) {
        alert("출판날짜를 입력해주세요.");
        return false;
    }
    if (!validateDate(book.publishDate)) {
        alert("출판 날짜는 과거여야 합니다")
        return false;
    }
    return true;
}
//출판날짜 유효성 검사(과거 날짜여야함)
function validateDate(date) {
    // new Date()를 사용하여 현재 날짜를 가져오고, 입력된 날짜와 비교
    const today = new Date();
    const publishDate = new Date(date);
    return publishDate < today;
}