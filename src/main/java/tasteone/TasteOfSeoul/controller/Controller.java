package tasteone.TasteOfSeoul.controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tasteone.TasteOfSeoul.domain.RestaurantVO;
import tasteone.TasteOfSeoul.service.MyService;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Controller
public class Controller {

    @Autowired
    MyService myService;


    @GetMapping("/map")
    public String map(Model model) {
        System.out.println("지도 실행중...");

        return "map";
    }


    @GetMapping("/getRestaurantName")
    public ResponseEntity<Map<String, Object>> testData(
            @RequestParam("input") String input
    ) {

        System.out.println("값 : " + input);

        Map<String, Object> data = new HashMap<>();
        RestaurantVO vo = myService.getRestaurantName(input);
        System.out.println(vo);
        System.out.println("가게명 : " + vo.getRestaurantName());
        System.out.println("주소 : " + vo.getAddress());
        System.out.println(" 위도: " + vo.getLatitude());
        System.out.println(" 경도: " + vo.getLongitude());

        data.put("name", vo.getRestaurantName());
        data.put("addr", vo.getAddress());
        data.put("latitude", vo.getLatitude());
        data.put("longitude", vo.getLongitude());
        data.put("open", vo.getOpenHour());
        data.put("close", vo.getCloseHour());
        data.put("category", vo.getCategory());

        return ResponseEntity.ok(data);
    }

    @GetMapping("/allData")
    public ResponseEntity<List<RestaurantVO>> getData() {
        List<RestaurantVO> list = myService.getRestaurantData();

        return ResponseEntity.ok(list);
    }

}