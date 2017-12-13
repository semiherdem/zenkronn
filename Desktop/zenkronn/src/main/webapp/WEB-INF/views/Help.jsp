<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>


<div class="page-header">
<h1>FAQ <small><i class="ace-icon fa fa-angle-double-right"></i> frequently asked questions using tabs and accordions</small></h1>

</div>

<div class="tabbable">
    <ul id="myTab" class="nav nav-tabs padding-18 tab-size-bigger">
      <li class="active">
        <a href="#faq-tab-1" data-toggle="tab">
            <i class="blue ace-icon fa fa-question-circle bigger-120"></i>
            General
        </a>
      </li>
    </ul>

    <div class="tab-content no-border padding-24">
       <div class="tab-pane fade in active" id="faq-tab-1">
          <h4 class="blue">
              <i class="ace-icon fa fa-check bigger-110"></i> General Questions
          </h4>

          <div class="space-8"></div>

          <div class="panel-group accordion-style1 accordion-style2" id="faq-list-1">
              "Help Page" is under construction for Zenkronn :)
          </div>
        </div>
    </div>
 </div>




