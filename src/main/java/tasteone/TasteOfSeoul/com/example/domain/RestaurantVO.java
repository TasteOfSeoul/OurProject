package tasteone.TasteOfSeoul.com.example.domain;

import lombok.Data;

@Data
public class RestaurantVO {

    private int id;
    private String restaurantName;  //음식점 이름
    private String addr;  // 음식점 주소
    private String category;  //음식 카테고리
    private String latitude;   // 위도
    private String longitude;  // 경도
    private String open;  // 오픈시간
    private String close;  // 마감시간
    private String number;  //  연락처





}
