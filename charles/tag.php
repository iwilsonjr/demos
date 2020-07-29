<?php get_header(); ?>
	
	<!--Content-->
	<main>

		<div class="content" id="content">	
	
		<h1 class="ver"><?php _e( 'Tag Archive / ', 'html5blank' ); echo single_tag_title('', false); ?></h1>
	
		<?php get_template_part('loop'); ?>
		
		<?php get_template_part('pagination'); ?>
	
		</div>
	
	</main>
	<!--Content-->
	
<?php get_sidebar(); ?>

<?php get_footer(); ?>