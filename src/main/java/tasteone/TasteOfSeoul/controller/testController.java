package tasteone.TasteOfSeoul.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import tasteone.TasteOfSeoul.service.MyService;

@Controller
public class testController {

    @Autowired
    MyService myService;

    @GetMapping("/")
    public String index() {
        // index.jsp 파일을 반환
        return "index";
    }

    @GetMapping("/map")
    public String map(Model model) {
        System.out.println("지도 실행중...");

        return "map";
    }


    @GetMapping("/testmap")
    public String maptest(Model model) {
        System.out.println("테스트용 지도 실행중...");

        return "testmap";
    }

    @GetMapping("/testlocation")
    public String testlocation(Model model) {
        System.out.println("위치 테스트");

        return "testlocation";
    }
}
