package com.wavemaker.financeai.promptResponse.service;


import com.wavemaker.financeai.promptResponse.model.*;
import com.wavemaker.financeai.promptResponse.model.RootRequest;
import com.wavemaker.financeai.promptResponse.model.RootResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;
import org.springframework.util.MultiValueMap;
import feign.*;

public interface PromptResponseService {

  /**
   * 
   * 
    * @param scriptName  (required)
    * @param body RequestBody (optional)
   * @return RootResponse
   */
  @RequestLine("POST /scriptInfo/{scriptName}")
  @Headers({
    "Content-Type: application/json",
    "Accept: application/json",  })
  RootResponse invoke(@Param("scriptName") String scriptName, RootRequest body);

}
