# PowerShell HTTP Server for TOEFL Listening Test
$port = 8000
$path = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting local server for TOEFL Listening Test..." -ForegroundColor Green
Write-Host ""
Write-Host "Open your browser and go to: " -NoNewline
Write-Host "http://localhost:$port/toefllistening.html" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

cd $path

try {
    python -m http.server $port
} catch {
    Write-Host "Python not found. Trying PowerShell alternative..." -ForegroundColor Yellow
    
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
    
    Write-Host "Server started at http://localhost:$port/"
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $filePath = Join-Path $path ($request.Url.LocalPath.TrimStart('/'))
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
        }
        
        $response.Close()
    }
}
