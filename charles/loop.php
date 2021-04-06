
<?php if (have_posts()) { ?>

	<ul class="blogLister">

	<?php while (have_posts()) : the_post(); ?>
	
			<li>

	<!-- article -->
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<!-- post title -->
		<header class="blogHeader">
			<h2 class="entryHeader"><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
		</header>
		<!-- /post title -->

		<!-- post details -->
		<aside class="entryData">

			<strong><time datetime="<?php the_time('Y-m-d'); ?>" pubdate="pubdate"><span><?php the_time('d'); ?></span> <abbr title="<?php the_time('F'); ?>"><?php the_time('M'); ?></abbr> <span><?php the_time('Y'); ?></span></time></strong> 

			<p class="hide">Related Categories:</p>
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
		
	</article>
	<!-- /article -->

	</li>
	
<?php endwhile; ?>

</ul>

<?php } else { ?>

	<!-- article -->
	<article>
		<div class="blogEntry"> 
			<p><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></p>
		</div>
	</article>
	<!-- /article -->

<?php } ?>