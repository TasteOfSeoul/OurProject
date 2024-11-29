package tasteone.TasteOfSeoul.mapper;

import tasteone.TasteOfSeoul.domain.testVO;

import java.util.List;

@Mapper
public interface testMapper {

    List<testVO> getList();
}
