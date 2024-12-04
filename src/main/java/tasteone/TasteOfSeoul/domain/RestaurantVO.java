package tasteone.TasteOfSeoul.domain;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
public class RestaurantVO {

/*
    private int id;
    private String restaurantName;  //음식점 이름
    private String addr;  // 음식점 주소
    private String category;  //음식 카테고리
    private String latitude;   // 위도
    private String longitude;  // 경도
    private String open;  // 오픈시간
    private String close;  // 마감시간
    private String number;  //  연락처

*/

    private Long restaurantId;
    private String restaurantName;  //음식점 이름
    private String address;  // 음식점 주소
    private String category;  //음식 카테고리
    private BigDecimal latitude;  // 위도
    private BigDecimal longitude;  // 경도
    private LocalTime openHour;  // 오픈시간
    private LocalTime closeHour;  // 마감시간
    private String phone;  //  연락처





}
