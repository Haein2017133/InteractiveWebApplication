<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <!-- this XSL stylesheet matches the <JavacoTea> tag in an associated XML
	file and replaces it with the HTML contents of the template. -->
    <xsl:template match="/">
       
                <table id="bookListTable" border="1" class="indent">
                    <thead align ="center">
                        <tr>
                            <th colspan="8">The current book list</th>
                        </tr>
                        

                        <tr>
                            <th>Select</th>
                            <th>ISBN</th>
                            <th>Author</th>
                            <th>Title</th>
                            <th>publisher </th>
                            <th>Published year</th>
                             <th>Genre</th>
                            <th>Price</th>
                          
                        </tr>
                    </thead>
                    <tbody>
  
                          
                            <xsl:for-each select="/bookList/entree">
                            
                                <tr align="center">
                                  
                                    <td >
                                        <input name="item0" type="checkbox" />
                                    </td>
                                    <td width="15%">
                                        <xsl:value-of select="isbn" />
                                    </td>
                                    <td >
                                        <xsl:value-of select="author" />
                                    </td>
                                    <td >
                                        <xsl:value-of select="title" />
                                    </td>
                                    <td width="17%">
                                        <xsl:value-of select="publisher" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="publishedyear" />
                                    </td>
                                     <td>
                                        <xsl:value-of select="genre" />
                                    </td>
                                    <td align="right" width="7%">
                                        <xsl:value-of select="price" />
                                  </td>
                                </tr>
                            </xsl:for-each>
                       
                    </tbody>
                </table><br/>
    </xsl:template>
</xsl:stylesheet>