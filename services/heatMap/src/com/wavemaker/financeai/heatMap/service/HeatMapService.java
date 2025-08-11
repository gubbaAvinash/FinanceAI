package com.wavemaker.financeai.heatMap.service;


import com.wavemaker.financeai.heatMap.model.*;
import com.wavemaker.financeai.heatMap.model.ResponseRootResponseROOTEntryItem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;
import org.springframework.util.MultiValueMap;
import feign.*;

public interface HeatMapService {

  /**
   * 
   * 
   * @return List&lt;ResponseRootResponseROOTEntryItem&gt;
   */
  @RequestLine("GET /heatMap")
  @Headers({
    "Accept: application/json",  })
  List<ResponseRootResponseROOTEntryItem> invoke();

}
