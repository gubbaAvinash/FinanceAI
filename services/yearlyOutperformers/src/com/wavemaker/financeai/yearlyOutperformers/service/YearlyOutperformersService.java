package com.wavemaker.financeai.yearlyOutperformers.service;


import com.wavemaker.financeai.yearlyOutperformers.model.*;
import com.wavemaker.financeai.yearlyOutperformers.model.ResponseRootResponseROOTEntryItem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;
import org.springframework.util.MultiValueMap;
import feign.*;

public interface YearlyOutperformersService {

  /**
   * 
   * 
   * @return List&lt;ResponseRootResponseROOTEntryItem&gt;
   */
  @RequestLine("GET /yearlyOutperformers")
  @Headers({
    "Accept: application/json",  })
  List<ResponseRootResponseROOTEntryItem> invoke();

}
