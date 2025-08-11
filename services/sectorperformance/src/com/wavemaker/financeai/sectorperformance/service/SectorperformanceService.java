package com.wavemaker.financeai.sectorperformance.service;


import com.wavemaker.financeai.sectorperformance.model.*;
import com.wavemaker.financeai.sectorperformance.model.RootResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;
import org.springframework.util.MultiValueMap;
import feign.*;

public interface SectorperformanceService {

  /**
   * 
   * 
   * @return RootResponse
   */
  @RequestLine("GET /sectorperformance")
  @Headers({
    "Accept: application/json",  })
  RootResponse invoke();

}
