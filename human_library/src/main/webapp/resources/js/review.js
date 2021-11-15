/**
 * review.js
 * 댓글 구현. 클로저를 이용한 모듈
 */
 console.log("review module")

var reviewService = (function(){ 
  function add(review, callback, error) {//add start
      console.log("review.add()");

      $.ajax({ //ajax start
        type : "post", //post방식으로 값 보낼거다
        //url는 데이터를 받아올 페이지
        url : "/reviews/new", //reviews(reviewController의 매핑주소)에 있는 new(create매핑주소)를 불러옴
        //data는 요청시에 함께 보낼 파라미터들
        data : JSON.stringify(review),// JSON.stringify():JavaScript 값이나 객체를 JSON 문자열로 변환해서 data에 넣음
        contentType : "application/json; charset=utf-8",
        success : function(data) {//success는 성공시에 수행할 핸들러를 받는다.
          if(callback)
          callback(data);//데이터 성공하면 success를 콜백해줌
        },
        error : function(xhr, stat, er) {
          if(error) {
            error(er);//틀리면 에러띄움
          }
        }
      })//ajax end
  }//add end

   //getList()는 param이라는 객체를 통해서 필요한 파라미터를 전달받아 JSON목록을 호출
   function getList(param, callback, error){
       console.log("review.getList()");
       var isbn = param.isbn;//고정값
       var page = param.page || 1;
     
      // var url = '/reviews/' + param.bno + "/" + param.amount + "/" + param.lastRno;
        var url = "/reviews/pages/" + isbn + "/" + page;
        
       $.getJSON(url,function(data) {//$.getJSON:json 파일을 읽어서 웹페이지에 적용
        //callback(data);//댓글 목록만 가져오는 경우
    	   if(callback){
    	   callback(data.reviewCnt,data.list);//댓글 숫자와 목록을 가져오는 경우
       }
      }).fail(function(xhr,status,err) {
		if(error){
			error();
		}
	});
}
    //    $.ajax (url,{
    //      // type : 'get',
    //      dataType: 'json',
    //      //url : url,
    //      success : function(data) {
    //        callback(data);
    //      }
    //    })
   

   function remove(rno,callback,error){
        console.log("review.remove()");
        console.log(rno);
        //reviews(reviewController의 매핑주소)에 있는 new(create매핑주소)를 불러옴
        var url='/reviews/'+rno; 
        $.ajax(url,{
        	//type은 delete rest방식??
            type : "delete" 
          }).done(function(data){
            if(callback)
              callback(data);
         
          })

        // $.ajax(url,{
        //     type : "delete",
        //    // url : "/reviews/new",
        //     success : function(data) {
        //       callback(data);
        //     }
        //   })
   }
   function modify(review,callback,error){
        console.log("review.modify()");
        var url='/reviews/'+review.rno; 

        $.ajax(url,{
            type : "put", //수정
            url : "/reviews/new",//reviews(reviewController의 매핑주소)에 있는 new(create매핑주소)를 불러옴
            data : JSON.stringify(review),//요청시에 review를 json형태로 바꿔서 data를 보냄
            contentType : "application/json; charset=utf-8",
            success : function(data) {
                if(callback)
              callback(data);
            }
          })
   }
   function get(rno,callback,error){
        console.log("review.get()");
        var url='/reviews/'+rno; 
        $.getJSON(url,function(data) {
            if(callback)
            callback(data);
          });
   }
 
   function displayTime(timeValue) {
    return moment().diff(moment(timeValue), 'days') < 1 ? moment(timeValue).format('yyyy.MM.DD. HH:mm:ss') : moment(timeValue).format('yyyy.MM.DD. HH:mm:ss');
  }



   return {
     add:add,
     getList:getList,
     remove:remove,
     modify:modify,
     get:get,
     displayTime:displayTime
   }
  })();