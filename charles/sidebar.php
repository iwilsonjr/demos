        <!--Site Navigation-->
        <nav>
        	
			<div class="navSite" id="navigation">

	        	<h2>Navigation</h2>

	        	<!--Primary-->
	        	<?php html5blank_nav(); ?>
				<!--Primary-->
				
				<p class="hide"><a href="#content">Return to Content</a></p>

				<div class="navFind" id="find">

					<!--Categories-->				
					<div class="blkCategories">
						<h3>Categories</h3>
						
						<ul>
							<?php wp_list_categories( array(
								'show_option_all'    => '',
								'orderby'            => 'name',
								'order'              => 'ASC',
								'style'              => 'list',
								'show_count'         => 1,
								'hide_empty'         => 1,
								'use_desc_for_title' => 1,
								'hierarchical'       => 1,
								'title_li'           => __( '' ),
								'show_option_none'   => __('No categories'),
								'number'             => null,
								'echo'               => 1,
								'depth'              => 0
							)); ?>											
						</ul>					
					</div>
					<!--Categories-->

					<!--Archives-->
					<div class="blkArchives">                
						<h3>Archives</h3>
						
						<ul> 
							<?php wp_get_archives( array( 
								'type'            => 'monthly',
								'limit'           => '6',
								'format'          => 'html', 
								'show_post_count' => true,
								'echo'            => 1,
								'order'           => 'DESC'
							)); ?>							
						</ul>

						<form class="blkForm" action="<?php echo home_url(); ?>" method="get" id="archivesForm">
							<h4>Past Archives</h4>
							<div>
								<label for="archives">Archives</label>
								<select name="archives" id="archives"> 
									<option value=""><?php echo esc_attr( __( 'Select Month/Year' ) ); ?></option> 
  									<?php wp_get_archives( array( 'type' => 'monthly', 'format' => 'option', 'show_post_count' => 1 ) ); ?>
								</select>
							</div>
							<div class="buttonWell">
								<input type="submit" name="selectMonthArchive" id="selectMonthArchive" value="GO" />
							</div>
						</form>						

					</div>
					<!--Archives-->

					<!--Search-->				
					<div class="blkSearch">
						<h3>Search</h3>

						<?php get_template_part('searchform'); ?>
					
					</div>
					<!--Search-->									

				</div>
	        	<!--Contextual Navigation-->
				
				<p class="hide"><a href="#content">Return to Content</a></p>
				
		    </div>

        </nav>
        <!--Site Navigation-->