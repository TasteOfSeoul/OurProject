package tasteone.TasteOfSeoul.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tasteone.TasteOfSeoul.domain.testVO;
import tasteone.TasteOfSeoul.mapper.testMapper;

import java.util.List;

@Service
public class MyService {

    @Autowired
    testMapper testMapper;

    public List<testVO> getList() {
        return testMapper.getList();
    }
}
