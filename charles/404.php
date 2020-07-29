<?php get_header(); ?>

	<!--Content-->
	<main>

		<div class="content" id="content">		
	
		<!-- article -->
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		
			<p><?php _e( 'Page not found', 'html5blank' ); ?> - <a href="<?php echo home_url(); ?>"><?php _e( 'Return home', 'html5blank' ); ?></a></p>
			
		</article>
		<!-- /article -->
		
		</div>
	
	</main>
	<!--Content-->
	
<?php get_sidebar(); ?>

<?php get_footer(); ?>