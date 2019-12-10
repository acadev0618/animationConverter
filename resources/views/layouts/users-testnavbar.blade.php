<header class="user-header fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        @if(isset($customSidebar) && $customSidebar)
        <a href="/" class="navbar-btn btn back-to-main">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
        </a>
        @else
        <button type="button" id="sidebarCollapse" class="navbar-btn btn">
            <span></span>
            <span></span>
            <span></span>
        </button>
        @endif
        <a href="/" class="logo navbar-brand">
            <div class="app-name">{{ config('app.name') }}</div>
        </a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-2 mr-auto">
                @if (session()->get('login_as_user') == 'admin')
                <li class="nav-item">
                    <a href="{{ url('/login-as-admin', [], config('site.ssl_tf')) }}" class="btn btn-sm btn-outline-secondary">
                        <i class="fas fa-arrow-left"></i> Back to Admin
                    </a>
                </li>
                @endif
            </ul>

        </div>
    </nav>
</header>

