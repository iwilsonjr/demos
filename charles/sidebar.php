	<!--Tabs-->
	<ul role="tablist">
		<li role="presentation"><a href="#blkCategories" id="tab-1" role="tab" aria-selected="true">Categories</a></li>
		<li role="presentation"><a href="#blkArchives" id="tab-2" role="tab">Archives</a></li>
		<li role="presentation"><a href="#blkSearch" id="tab-3" role="tab">Search</a></li>
	</ul>
	<!--Tabs-->
	
	<!--Categories-->				
	<div class="blkCategories" id="blkCategories" role="tabpanel" aria-labelledby="tab-1">
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
				'hierarchical'       => 0,
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
	<div class="blkArchives" id="blkArchives" role="tabpanel" aria-labelledby="tab-2" hidden="true">                
		<h3>Archives</h3>
		
		<div class="currentArchives">
			<h4>
				Recent Archives</h4>
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
		</div>

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
	<div class="blkSearch" id="blkSearch" role="tabpanel" aria-labelledby="tab-3" hidden="true">
		<h3>Search</h3>

		<?php get_template_part('searchform'); ?>
	
	</div>
	<!--Search-->