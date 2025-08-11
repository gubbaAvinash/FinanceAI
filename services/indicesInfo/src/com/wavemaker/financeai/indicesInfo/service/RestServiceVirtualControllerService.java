package com.wavemaker.financeai.indicesInfo.service;


import com.wavemaker.financeai.indicesInfo.model.*;
import com.wavemaker.financeai.indicesInfo.model.RootResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;
import org.springframework.util.MultiValueMap;
import feign.*;

public interface RestServiceVirtualControllerService {

  /**
   * 
   * 
   * @return RootResponse
   */
  @RequestLine("GET /indicesInfo")
  @Headers({
    "Accept: application/json",  })
  RootResponse restServiceVirtualControllerInvoke();

}
