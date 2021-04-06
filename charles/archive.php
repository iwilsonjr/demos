<?php get_header(); ?>
	
<?php get_template_part('navigation'); ?>

	<!--Content-->
	<main>

		<div class="content" id="content">			
	
		<h1 class="ver"><?php _e( 'Archives for', 'html5blank' ); single_month_title(' '); ?></h1>
	
		<?php get_template_part('loop'); ?>
		
		<?php get_template_part('pagination'); ?>
	
		</div>
	
	</main>
	<!--Content-->

<?php get_footer(); ?>