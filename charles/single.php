<?php get_header(); ?>
	
	<!--Content-->
	<main>

		<div class="content" id="content">	

	<?php if (have_posts()){

	 while (have_posts()) : the_post(); ?>
	
		<!-- article -->
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			
				<!-- post title -->
				<header class="blogHeader">
					<h1><?php the_title(); ?></h1>
				</header>
				<!-- /post title -->

				<!-- post details -->
				<aside class="entryData">
					<strong><time datetime="<?php the_time('Y-m-d'); ?>" pubdate="pubdate"><span><?php the_time('d'); ?></span> <span><?php the_time('M'); ?></span> <span><?php the_time('Y'); ?></span></time></strong> 
					<ul>
						<?php
						// get the category IDs assigned to post
						$categories = wp_get_post_categories( $post->ID, array( 'fields' => 'ids' ) );

						//Write Formatted Categories
						if ( $categories ) {

							$cat_ids = implode( ',' , $categories );
							$cats = wp_list_categories( 'title_li=&style=list&echo=0&include=' . $cat_ids );
							
							// display post categories
							echo  $cats;
						}
						?>
					</ul>

					<?php

					//Check for Comments
					$comment_count = get_comment_count($post->ID);

					if ($comment_count['approved'] > 0) { ?>
						<p><?php comments_popup_link( __( '', 'html5blank' ), __( '1 Comment', 'html5blank' ), __( '% Comments', 'html5blank' )); ?></p>
					<?php } ?>
					<p><?php edit_post_link(); ?></p>				
				</aside>		
				<!-- /post details -->	
				
				<div class="blogEntry">			
					<?php the_content(); // Dynamic Content ?>			

				</div>
				
				<footer>
					<p class="entryFooter"> <?php the_tags( __( '<strong>Tags:</strong> ', 'html5blank' ), ', ', ''); ?>
				</footer>

				<!-- pagination -->
				<div class="pageNavigation blog">
					<ul>
						<li><?php previous_post_link('%link'); ?></li>
						<li><?php next_post_link('%link'); ?></li>
					</ul>
				</div>
				<!-- /pagination -->					

			<?php comments_template(); ?>
			
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