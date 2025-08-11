package com.wavemaker.financeai.topGainersLosers.service;


import com.wavemaker.financeai.topGainersLosers.model.*;
import com.wavemaker.financeai.topGainersLosers.model.ResponseRootResponseROOTEntryItem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;
import org.springframework.util.MultiValueMap;
import feign.*;

public interface TopGainersLosersService {

  /**
   * 
   * 
   * @return List&lt;ResponseRootResponseROOTEntryItem&gt;
   */
  @RequestLine("GET /topGainersLosers")
  @Headers({
    "Accept: application/json",  })
  List<ResponseRootResponseROOTEntryItem> topGainersLosersInvoke();

}
