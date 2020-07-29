<?php get_header(); ?>
	
	<!--Content-->
	<main>

		<div class="content" id="content">	
	
		<h1><?php the_title(); ?></h1>
	
	<?php if (have_posts()) {

	 while (have_posts()) : the_post(); ?>
	
		<!-- article -->
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		
			<?php the_content(); ?>
								
			<p><?php edit_post_link(); ?></p>
			
		</article>
		<!-- /article -->
		
	<?php endwhile; ?>
	
	<?php } else { ?>
	
		<!-- article -->
		<article>
			<div class="blogEntry"> 
				<p><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></p>
			</div>
		</article>
		<!-- /article -->
	
	<?php } ?>
	
	
		</div>
	
	</main>
	<!--Content-->
	
<?php get_sidebar(); ?>

<?php get_footer(); ?>