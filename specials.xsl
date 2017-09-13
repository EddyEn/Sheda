<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:import  href="prod_icon.xsl" />
	<xsl:output method="html"/>
	<!-- Be careful to referenc to root document with the sing, "/".
	IT DOES NOT GIVE A PROPER RESULT TO A TAG, <xsl:apply-templates> -->
	<xsl:template match="CATALOG">
		<div class="left_content">

			<div class="title">
				<span class="title_icon">
					<img src="images/bullet1.gif" alt="" title="" />
				</span>Special gifts
			</div>

			<xsl:apply-templates mode="feat_box" select="PLANT[SPECIAL/GIFT='yes']">
				<xsl:with-param name="brand">special</xsl:with-param>
			</xsl:apply-templates>

			<div class="clear"></div>
		</div>
		<!--end of left content-->

	</xsl:template>

</xsl:stylesheet>
