<?php get_header(); ?>
	
	<!--Content-->
	<main>

		<div class="content" id="content">	
	
		<h1 class="ver"><?php echo sprintf( __( '%s Search Results for ', 'html5blank' ), $wp_query->found_posts ); echo get_search_query(); ?></h1>
		
		<?php get_template_part('loop'); ?>
		
		<?php get_template_part('pagination'); ?>
	
		</div>
	
	</main>
	<!--Content-->
	
<?php get_sidebar(); ?>

<?php get_footer(); ?>