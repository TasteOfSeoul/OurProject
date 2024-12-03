package tasteone.TasteOfSeoul.com.example.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tasteone.TasteOfSeoul.com.example.domain.RestaurantVO;
import tasteone.TasteOfSeoul.com.example.mapper.projectMapper;


import java.util.List;

@Service
public class MyService {

    @Autowired
    projectMapper mapper;


    public RestaurantVO getRestaurantName(String name) {   //입력받은 음식점에 대한 정보 조회
        System.out.println("입력받은 값 : " + name);
        RestaurantVO restaurantVO = mapper.restaurantName(name);

        System.out.println("db에 저장된 값 : " + restaurantVO.getRestaurantName());
        return restaurantVO;
    }


    public List<RestaurantVO> getRestaurantData() { //음식점 정보 전체 조회
            return mapper.restaurantData();
        }



}
