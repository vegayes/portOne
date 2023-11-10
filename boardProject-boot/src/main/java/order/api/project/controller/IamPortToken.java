//package order.api.project.controller;
//
//
//import java.net.http.HttpClient;
//import java.net.http.HttpResponse;
//import java.util.HashMap;
//import java.util.Map;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//public class IamPortToken {
//
//    public static final String IMPORT_TOKEN_URL = "https://api.iamport.kr/users/getToken"; 
//    
//    public static final String KEY = "3671062186288787";
//    public static final String SECRET = "r6GTetsqPbnI0fLkQvIO2WHufe2vrOdzI8AbvaWINf6pFnph0tFDCkAxKxtRydIzK7Kenx9lHGdVxUy1";     
//    
//    // 아임포트 인증(토큰)을 받아주는 함수 
//    public String getImportToken() { 
//        String result = ""; 
//        HttpClient client = HttpClientBuilder.create().build();
//        HttpPost post = new HttpPost(IMPORT_TOKEN_URL); 
//        Map<String,String> m =new HashMap<String,String>(); 
//        m.put("imp_key", KEY); 
//        m.put("imp_secret", SECRET); 
//        try { post.setEntity(new UrlEncodedFormEntity(convertParameter(m))); 
//            HttpResponse res = client.execute(post); 
//            ObjectMapper mapper = new ObjectMapper(); 
//            String body = EntityUtils.toString(res.getEntity()); 
//            JsonNode rootNode = mapper.readTree(body); 
//            JsonNode resNode = rootNode.get("response"); 
//            result = resNode.get("access_token").asText(); 
//        } catch (Exception e) { 
//            e.printStackTrace(); 
//        } 
//        
////        log.info("#################################################### TOKEN :"+result);
//        return result;
//    } 
//	
//}
