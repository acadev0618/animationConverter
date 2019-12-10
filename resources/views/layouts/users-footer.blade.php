<div class="page-footer">
    <div class="support-help">
        <button type="button" id="help-btn" class="btn btn-dark">
            <i class="fas fa-question question-icon"></i>
            <i class="fas fa-times close-icon"></i>
        </button>
    </div>
</div>
<div id="send-support-message">
    <form action="{{ secure_routing(route('messages.store')) }}" enctype="multipart/form-data" method="POST" target="_self" class="form-group">
        @csrf
        <div class="h4 text-underline">
            Send Message To Support
        </div>
        <div class="small">Send your question below and we'll get back to you within the next 24 hours.</div>
        <div class="row justify-content-center align-items-center">
            <div class="col-sm-11">
                <div class="row">
                    <label class="col-md-3 col-form-label" for="email">{{ trans('application.support_label_email') }}</label>
                    <div class="col-md-9">
                        <input type="email" class="form-control" id="email" name="email" required/>
                    </div>
                </div>
                <div class="row mt-md-3">
                    <label class="col-md-3 col-form-label" for="message_subject">Subject</label>
                    <div class="col-md-9">
                        <input type="text" class="form-control" id="message_subject" name="message_subject" minlength="2" maxlength="200" required/>
                    </div>
                </div>
                <div class="row mt-md-3">
                    <label class="col-md-3 col-form-label" for="message_content">Description</label>
                    <div class="col-md-9">
                        <textarea class="form-control" rows="6" id="message_content" name="message_content" minlength="10" required></textarea>
                    </div>
                </div>
                <div class="row mt-md-2">
                    <div class="col-md-12 text-right">
                        <input type="file" class="form-control hidden" id="attached_file" name="attached_file" @change="changedFile($event)"
                               accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*, audio/*, video/*"/>
                        <i class="fas fa-paperclip pointer-cursor" id="upload-icon"></i>
                        <i class="fas fa-angle-down pointer-cursor"></i>
                        <div id="file_name" class="text-right w-100"></div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12 text-right">
                        <button type="submit" class="btn btn-nav-bg">SEND</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
