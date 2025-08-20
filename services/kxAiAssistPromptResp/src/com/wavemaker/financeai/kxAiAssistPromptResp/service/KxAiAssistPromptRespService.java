package com.wavemaker.financeai.kxAiAssistPromptResp.service;


import com.wavemaker.financeai.kxAiAssistPromptResp.model.*;
import com.wavemaker.financeai.kxAiAssistPromptResp.model.RootRequest;
import com.wavemaker.financeai.kxAiAssistPromptResp.model.RootResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;
import org.springframework.util.MultiValueMap;
import feign.*;

public interface KxAiAssistPromptRespService {

  /**
   * 
   * 
    * @param body RequestBody (optional)
   * @return RootResponse
   */
  @RequestLine("POST /kxaiAssistant")
  @Headers({
    "Content-Type: application/json",
    "Accept: application/json",  })
  RootResponse invoke(RootRequest body);

}
