Office.onReady(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('error')) {
        const errorData = {
            errorMessage: params.get('error'),                      
            message: params.get('error_description'),
            errorCode: `Logout failed on redirect: ${window.location.href}`
        };
        Office.context.ui.messageParent(JSON.stringify({
           status: "failed",
           result: errorData,
        }));
    } else {
        Office.context.ui.messageParent(JSON.stringify({ status: 'success' }));
    }
});