// 결제 
var IMP = window.IMP;
IMP.init("imp82107782");

function requestPay() {
    IMP.request_pay({

        // 결제정보를 결제api 진행하면서 넣어야 하는거 아니야? 왜 미리 넣어?
        // => 미리 넣는다고 했을 때 loginMember의 정보를 넣음.
        



            pg: "html5_inicis",		//KG이니시스 pg파라미터 값
            pay_method: "card",		//결제 방법
            merchant_uid: "1234578" + new Date().getTime(),//주문번호 전달 ★
            name: "당근 10kg",		//상품 명★ 주문명 : 결제 테스트
            amount: 100,			//금액 ★
            //customer_uid : "CUSTOMER_UID", //customer_uid 파라메터가 있어야 빌링키 발급을 시도합니다.★★★
            buyer_email: "gildong@gmail.com", // ★
            buyer_name: "홍길동", // ★
            buyer_tel: "010-4242-4242", // ★
            buyer_addr: "서울특별시 강남구 신사동", // ★
            buyer_postcode: "01181" // ★
        },
        function (rsp) {
              //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단함.
           	  console.log("응답 개체:", rsp);
            if (rsp.success) {
                // jQuery로 HTTP 요청
                jQuery.ajax({
                    url: "/payment/confirm", // 실제 가맹점 서버의 결제 확인 엔드포인트로 변경 //"{서버의 결제 정보를 받는 가맹점 endpoint}", 
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    data: {
                        imp_uid: rsp.imp_uid,            //결제 고유번호     
                        merchant_uid: rsp.merchant_uid   //주문번호
                    }
	            }).done(function (data) {
	                if (rsp.paid_amount === data.response.amount) {
	                    alert("결제 성공");
	                } else {
	                    alert("결제 실패");
	                }
	            });
	                
             // 결제 성공 시 로직,
                var msg = "결제가 완료되었습니다.";
                msg += "고유ID : " + rsp.imp_uid;
                msg += "상점 거래 ID : " + rsp.merchant_uid;
                msg += "결제 금액 : " + rsp.paid_amount;
                msg += "카드 승인번호 : " + rsp.apply_num;
                
                
                // 카드 승인번호 확인
	            if (rsp.apply_num) {
	                msg += "카드 승인번호 : " + rsp.apply_num;
	            } else {
	                msg += "카드 승인번호가 없습니다.";
	            }
	            console.log("msg:" + msg);

                alert("결제 성공");
                
            } else {
                alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
                location.href = "goods_pay_fail.do?error_msg=" + rsp.error_msg;
            }
            
        });
}


