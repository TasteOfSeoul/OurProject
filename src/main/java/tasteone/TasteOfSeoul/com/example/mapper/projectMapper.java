package tasteone.TasteOfSeoul.com.example.mapper;


import org.apache.ibatis.annotations.Mapper;
import tasteone.TasteOfSeoul.com.example.domain.RestaurantVO;

import java.util.List;

@Mapper
public interface projectMapper {

     RestaurantVO restaurantName(String name);  //음식점 이름 검색 시 db에서 일치하는 음식점 정보 조회
     List<RestaurantVO> restaurantData();  //  db에 있는 전체 음식점 정보 조회
}
