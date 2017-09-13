<?xml version="1.0" encoding="UTF-8"?>  
<!--This style sheet provides the most basic element formats for products display.
    There are four template modes to be call form others xml files. this provide
    style of box containing product image. This xsl serves as a utility function
    to be call by others-->
<xsl:stylesheet version="1.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
xmlns:custom="http://flower_shop/custom">

	<xsl:output method="html"/>
  <!-- ////////////////////////////////////////////////////////////// Detail box ///////////////////////////////////////////////-->
	<!-- Produc box with deatil -->
	<xsl:template match="PLANT" mode="feat_box">
	<!-- This is a parameter declaration, be carful with the argruement to which a value will be passed from the parameter-->
		<xsl:param name="brand"/> <!-- param has to be the first element in a template-->

		<div class="feat_prod_box">
			<xsl:apply-templates select="PHOTO" mode="feat_box"/>
			<div class="prod_det_box">			
				<!--<span class="special_icon"><img src="images/special_icon.gif" alt="" title="" /></span>-->
				<xsl:if test = "$brand = 'special'"> <!--choose branding icon of the box element -->
					<!-- HTML tags,including <,> sings, are considered as XML tage, hence it need to be populated as an element -->
					<xsl:element name="span"><xsl:attribute name="class">special_icon</xsl:attribute>
						<xsl:element name="img"><xsl:attribute name="src">images/special_icon.gif</xsl:attribute>
						</xsl:element>
					</xsl:element>
				</xsl:if>

				<div class="box_top"></div>
				<div class="box_center">
					<div class="prod_title"><xsl:apply-templates select="NAME/COMMON"/></div>
					<p class="details"><xsl:apply-templates select="DETAIL"/></p>
					<div class="clear"></div>
				</div> 

				<div class="box_bottom"></div>
			</div>     
			<div class="clear"></div>
		</div>
	</xsl:template>


	<!-- Image for Produc box with deatil -->
	<xsl:template match="PHOTO" mode="feat_box"> <!--To display image-->
        <!--<xsl:value-of select="custom:uriencode(string($PrimarySubject))" />-->
		<div class="prod_img"><a href="#?name={../NAME/COMMON}" onclick="getProdDetail('{../NAME/COMMON}')"><img src="{.}" alt="" title="" border="0" style="width:140px;height:140px;" /></a></div>
	</xsl:template>


	<!-- ////////////////////////////////////////////////////////////// Product box ///////////////////////////////////////////////-->
	<xsl:template match="PLANT" mode="prod_box">
		<xsl:param name="new" select="''"/>
		<xsl:param name="promo" select="''" />
		<div class="new_prod_box">
			<a href="#?name={NAME/COMMON}" onclick="getProdDetail('{NAME/COMMON}')"><xsl:apply-templates select="NAME/COMMON"/></a>
      
			<xsl:apply-templates select="PHOTO" mode="prod_box">
				<xsl:with-param name="new_brand" select="$new" />
				<xsl:with-param name="promo_brand" select="$promo" />
			</xsl:apply-templates>
		</div>
	</xsl:template>


	<!-- Image for Produc box -->
	<xsl:template match="PHOTO" mode="prod_box"> <!--To display image-->
		<xsl:param name="new_brand" />
		<xsl:param name="promo_brand" />
		<div class="new_prod_bg">
      <!-- If the product is new then show New banner-->
			<xsl:if test="(../SPECIAL/NEW='yes' and $promo_brand != 'promo') or ($new_brand='new')"> <!--papameter new_brand has to be filltered from higer heirarchy -->
				<!-- HTML tags,including <,> sings, are considered as XML tage, hence it need to be populated as an element-->
				<xsl:element name="span"><xsl:attribute name="class">new_icon</xsl:attribute>
					<xsl:element name="img"><xsl:attribute name="src">images/new_icon.gif</xsl:attribute>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="(../SPECIAL/PROMO='yes' and $new_brand != 'new') or ($promo_brand='promo')"> <!--choose brand of the box element -->
				<!-- HTML tags,including <,> sings, are considered as XML tage, hence it need to be populated as an element-->
				<xsl:element name="span"><xsl:attribute name="class">new_icon</xsl:attribute>
					<xsl:element name="img"><xsl:attribute name="src">images/promo_icon.gif</xsl:attribute>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<a href="#?name={../NAME/COMMON}" onclick="getProdDetail('{../NAME/COMMON}')"><img src="{.}" style="width:100px;height:100px;" ></img></a>
		</div>
	</xsl:template>

<msxsl:script language="JScript" implements-prefix="custom">
function uriencode(string) {
 return encodeURIComponent(string);
}
</msxsl:script>
</xsl:stylesheet>