// 결제 
var IMP = window.IMP;
IMP.init("imp82107782");

function requestPay() {

        // 결제정보를 결제api 진행하면서 넣어야 하는거 아니야? 왜 미리 넣어?
        // => 미리 넣는다고 했을 때 loginMember의 정보를 넣음.
    var donationType = document.querySelector('input[name="donationType"]:checked').value;
    var donationAmount = document.querySelector('input[name="donationAmount"]:checked').value;

    console.log("type : " + donationType);
    console.log("amount : " + donationAmount);


    IMP.request_pay({

            pg: "html5_inicis",		//KG이니시스 pg파라미터 값
            pay_method: "card",		//결제 방법
            merchant_uid: "1234578" + new Date().getTime(),//주문번호 전달 ★
	        // 라디오 버튼에서 선택한 값을 결제 정보에 추가
	        name: '멍프랜드 ' + (donationType === '일시' ? '일시 후원' : '정기 후원'),
	        amount: parseInt(donationAmount), // 문자열을 숫자로 변환하여 저장
            //customer_uid : "CUSTOMER_UID", //customer_uid 파라메터가 있어야 빌링키 발급을 시도합니다.★★★
        },
        function (rsp) {
		        console.log(rsp);
		        if (rsp.success) {
		            var msg = '결제가 완료되었습니다.';
		            msg += '고유ID : ' + rsp.imp_uid;
		            msg += '고유주문번호 : ' + rsp.merchant_uid;
		            msg += '결제 금액 : ' + rsp.paid_amount;
		            msg += '카드 승인번호 : ' + rsp.apply_num;
		            msg += '구매자 이름 : ' +rsp.buyer_name;
		            var donationVo = {
                        imp_uid: rsp.imp_uid,
                        merchant_uid: rsp.merchant_uid
		            };
		            // 컨트롤러에 데이터를 전달하여 DB에 입력하는 로직
		            // 결제내역을 사용자에게 보여주기 위해 필요함.
		            fetch("/goodsPay", {
		                method: "POST",
		                body: JSON.stringify(donationVo),
		                headers: {
		                    "Content-Type": "application/json"
		                }
		            })
		            .then(response => response.text())
		            .then(result => {
		                if (result === "y") {
		                    alert(msg);
		                    location.href = "orderComplete.do"; 
		                } else {
		                    alert("DB 후원 정보 입력 실패");
		                    return false;
		                }
		            })
		            .catch(error => console.error('Error:', error));
		        } else {
		            var msg = '결제에 실패하였습니다.';
		            msg += '에러내용 : ' + rsp.error_msg;
		            alert(msg);
		        }
        });
}


