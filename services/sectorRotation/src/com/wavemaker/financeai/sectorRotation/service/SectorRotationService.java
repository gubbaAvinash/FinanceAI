package com.wavemaker.financeai.sectorRotation.service;


import com.wavemaker.financeai.sectorRotation.model.*;
import com.wavemaker.financeai.sectorRotation.model.ResponseRootResponseROOTEntryItem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.Object;
import org.springframework.util.MultiValueMap;
import feign.*;

public interface SectorRotationService {

  /**
   * 
   * 
   * @return List&lt;ResponseRootResponseROOTEntryItem&gt;
   */
  @RequestLine("GET /sectorRotation")
  @Headers({
    "Accept: application/json",  })
  List<ResponseRootResponseROOTEntryItem> sectorRotationInvoke();

}
