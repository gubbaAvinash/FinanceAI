package com.wavemaker.financeai.treasuryInfo.service;


import com.wavemaker.financeai.treasuryInfo.model.*;
import com.wavemaker.financeai.treasuryInfo.model.RootResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;
import org.springframework.util.MultiValueMap;
import feign.*;

public interface TreasuryInfoService {

  /**
   * 
   * 
   * @return RootResponse
   */
  @RequestLine("GET /treasuryInfo")
  @Headers({
    "Accept: application/json",  })
  RootResponse invoke();

}
