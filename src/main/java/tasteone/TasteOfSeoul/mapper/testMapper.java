package tasteone.TasteOfSeoul.mapper;

import tasteone.TasteOfSeoul.domain.testVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface testMapper {

    List<testVO> getList();
}
