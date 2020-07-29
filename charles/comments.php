<div class="commentsDisplay" id="comments">
	<?php if (post_password_required()) : ?>
	<p><?php _e( 'Post is password protected. Enter the password to view any comments.', 'html5blank' ); ?></p>
</div>

	<?php return; endif; ?>

<?php if (have_comments()) : ?>

	<h2><?php comments_number(); ?></h2>

	<ol>
		<?php wp_list_comments('type=all&callback=html5blankcomments'); // Custom callback in functions.php ?>
	</ol>

<?php elseif ( ! comments_open() && ! is_page() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
	
	<!--<p><?php _e( 'Comments are closed here.', 'html5blank' ); ?></p>-->
	
<?php endif; ?>

<?php comment_form(); ?>

</div>